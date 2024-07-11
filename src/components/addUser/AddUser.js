import React, { useState } from "react";
import avatar from "../../assets/user.jpg";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useFirebase } from "../../utils/firebaseContext";
import { toast } from "react-toastify";

function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = useFirebase();

  async function handleSearchUser(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));

      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        setUser(querySnap.docs[0].data());
      } else {
       toast.warn("No user such found");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleAddUser() {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      console.log(newChatRef.id);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="absolute h-[max-content] w-[max-content] m-auto  bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-black flex flex-col gap-8  p-10 z-50 rounded-xl justify-center">
        <form onSubmit={handleSearchUser} className="flex items-center gap-4">
          <input
            name="username"
            className="outline-none border-secondary border rounded-lg p-4 "
            type="text"
            alt=""
            placeholder="Search name"
          />
          <button className="bg-primary text-white p-4 rounded-lg">
            Search
          </button>
        </form>
        {user && (
          <div className="flex items-center justify-between gap-6 text-white">
            <div className="flex items-center gap-6">
              <img
                className={`h-10 w-10 object-cover rounded-full`}
                src={user?.avatar || avatar}
                alt=""
              />
              <span className="font-medium">{user?.username}</span>
            </div>
            <button
              onClick={handleAddUser}
              className="bg-primary text-white p-2 rounded-lg"
            >
              Add User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddUser;
