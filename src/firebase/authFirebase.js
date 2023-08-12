import {
  collection,
  updateDoc,
  doc,
  getDocs,
  arrayUnion,
  setDoc,
  addDoc,
  collectionGroup,
  Timestamp,
  query,
  where,
  onSnapshot,
  arrayRemove,
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
    const { text, location_name, uri, geolocation } = data;

    const { downloadUrl } = await sendImageToStorage({
      name: nanoid(),
      uri: uri,
    });

    const postData = {
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName,
      authorEmail: auth.currentUser.email,
      authorImage: auth.currentUser.photoURL,
      text: text,
      location_name: location_name,
      image: downloadUrl,
      geolocation: geolocation,
      likes: [],
      comments: [],
      timestamp: Timestamp.fromDate(new Date()),
    };

    const refPosts = collection(db, "posts");

    await addDoc(refPosts, postData);

  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getAllPostsFirestore = async () => {
  try {
    const newData = await getDocs(collectionGroup(db, "posts")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        return newData;
      }
    );
    return newData;
  } catch (e) {
    console.log("firebaseFetchData error: ", e);
  }
};

export const getPostsCurrentUserFirestore = async () => {
  try {
    const posts = query(
      collection(db, "posts"),
      where("authorId", "==", auth.currentUser.uid)
    );
    let result = [];
    const newData = onSnapshot(posts, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      result = newData;
    });
  } catch (e) {
    console.log("firebaseFetchDataCurrent error: ", e);
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
    const { email, password, name, profile_picture } = data;
    await createUserWithEmailAndPassword(auth, email, password);

    const { downloadUrl } = await sendImageToStorage({
      name: nanoid(),
      uri: profile_picture,
    });

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: downloadUrl,
    });
    // await setDoc(doc(db, "users", auth.currentUser?.uid), {
    //   name: name,
    //   email: email,
    //   profile_picture: profile_picture,
    //   // posts: [],
    // });
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

export const likeFirestore = async (postId, isLike) => {
  try {
    const refPosts = doc(db, "posts", postId);
    await updateDoc(refPosts, {
      likes: isLike
        ? arrayRemove({ authorId: auth.currentUser.uid })
        : arrayUnion({ authorId: auth.currentUser.uid }),
    });
  } catch (error) {
    console.log("Reg Error: ", error.message);
    return;
  }
};
