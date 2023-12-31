import {
  collection,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  Timestamp,
  arrayRemove,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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

export const sendImageToStorage = async (file) => {
  try {
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
          console.log("error", error);
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              downloadUrl,
              metadata: uploadTask.snapshot.metadata,
            });
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const createUserFirestore = async (data) => {
  try {
    const { email, password, name, profile_picture } = data;
    await createUserWithEmailAndPassword(auth, email, password);
    const refPosts = doc(db, "users", auth.currentUser.uid);
    let downloadUrl = "";
    if (profile_picture) {
      const { downloadUrl } = await sendImageToStorage({
        name: nanoid(),
        uri: profile_picture,
      });
      downloadUrl = downloadUrl;
    }
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: downloadUrl,
    });

    await setDoc(refPosts, {
      authorAvatar: downloadUrl,
    });
  } catch (error) {
    console.log("Reg Error: ", error.message);
    console.dir(error);
    return error.code;
  }
};

export const signInFirestore = async (data) => {
  try {
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Reg Error: ", error.message);
    return error.code;
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

export const getAvatarsFirestore = async (userId) => {
  try {
    const refPosts = doc(db, "users", userId);

    const newData = await getDoc(refPosts);

    return newData?.data();
  } catch (error) {
    console.log("get avatars Error: ", error.message);
    return;
  }
};
export const sendCommentFirestore = async ({ text, postId }) => {
  try {
    const refComments = doc(db, "posts", postId);
    const sendData = {
      id: nanoid(),
      text: text,
      authorId: auth.currentUser.uid,
      timestamp: Timestamp.fromDate(new Date()),
    };
    await updateDoc(refComments, {
      comments: arrayUnion(sendData),
    });
  } catch (error) {
    console.log("Reg Error: ", error.message);
    return;
  }
};
