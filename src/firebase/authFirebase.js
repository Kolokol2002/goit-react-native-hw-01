import {
  collection,
  updateDoc,
  doc,
  getDocs,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as Location from "expo-location";

// const updateDataInFirestore = async (collectionName, docId) => {
//   try {
//     const ref = doc(db, collectionName, docId);

//     await updateDoc(ref, {
//       comments: [],
//     });
//     console.log("document updated");
//   } catch (error) {
//     console.log(error);
//   }
// };

export const writeDataToFirestore = async (data) => {
  try {
    const { text, location_name, uri } = data;

    const { coords } = await Location.getCurrentPositionAsync();
    const { downloadUrl } = await sendImageToStorage({
      name: nanoid(),
      uri: uri,
    });

    const postData = {
      text: text,
      location_name: location_name,
      image: downloadUrl,
      geolocation: coords,
    };

    const refPosts = doc(db, "users", auth.currentUser?.uid);
    await updateDoc(refPosts, {
      posts: arrayUnion({ id: nanoid(), likes: [], comments: [], ...postData }),
    });

    return await getDataFromFirestore();
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    return await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const currentUserData = newData.find(
        ({ id }) => id === auth.currentUser.uid
      );

      const infoUsers = {
        currentUser: currentUserData,
        allUsers: newData,
      };
      return infoUsers;
    });
  } catch (e) {
    console.log("firebaseFetchData error: ", e);
  }
};

export const sendImageToStorage = async (file) => {
  const fetchResponse = await fetch(file.uri);
  const theBlob = await fetchResponse.blob();
  const storageRef = ref(storage, "images/" + file.name);

  const uploadTask = uploadBytesResumable(storageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export const createUserFirestore = async (data) => {
  try {
    const { email, name, profile_picture } = data;
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, { displayName: name });
    await setDoc(doc(db, "users", auth.currentUser?.uid), {
      name: name,
      email: email,
      profile_picture: profile_picture,
      posts: [],
    });
  } catch (error) {
    console.log("Reg Error: ", error.message);
    return;
  }
};

export const signInFirestore = async (data) => {
  try {
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Reg Error: ", error.message);
    return;
  }
};
