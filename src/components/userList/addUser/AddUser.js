import React, { useState } from "react";
import avatar from "../../../assets/avatar.png";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import useUserStore from "../../../utils/userStore";
import { toast } from "react-toastify";

function AddUser({ onHandleAddMode }) {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  // Function to handle the search form submission
  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    // Check if the username is the same as the current user's username
    if (username === currentUser.username) {
      return toast.warn("This username is doesn't exist. Search another username.");
    }

    try {
      // Reference to the 'users' collection
      const userRef = collection(db, "users");
      // Query the 'users' collection to find the user with the given username
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      // Reference to the current user's chats document
      const userChatsRef = doc(db, "userchats", currentUser.id);
      const userData = await getDoc(userChatsRef);

      if (!querySnapshot.empty) {
        // Get the first matching user
        const newUser = querySnapshot.docs[0].data();
        // Check if the user is already in the current user's chat list
        const isUserExist = userData
          .data()
          .chats.some((chat) => chat.receiverId === newUser.id);

        if (isUserExist) {
          return toast.warn("Already in your chat. Please add a different user.");
        } else {
          setUser(newUser);
          // onHandleAddMode();
        }
      } else {
         return toast.warn("This username is doesn't exist. Search another username.");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("An error occurred while searching for the user. Please try again.");
    }
  }

  // Function to handle adding a new user to the chat list
  async function handleAdd() {
    // Reference to the 'chats' and 'userchats' collections
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      // Create a new chat document
      const newChatRef = doc(chatRef);
      console.log(newChatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update the new user's chat list with the new chat ID
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      // Update the current user's chat list with the new chat ID
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      toast.success("User added successfully! You can now start chatting.");
      onHandleAddMode();
    } catch (err) {
      console.log(err.message);
      toast.error("An error occurred while adding the user. Please try again.");
    }
  }

  return (
    <div className="absolute h-[max-content]  w-[max-content] m-auto  bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-black flex flex-col gap-8  p-4 xs:p-10 z-50 rounded-xl justify-center">
        <form onSubmit={handleSearch} className="flex items-center xs:gap-4 gap-2 ">
          <input
            name="username"
            className="outline-none border-secondary border rounded-lg xs:p-4 p-3  "
            type="text"
            alt=""
            placeholder="Search name"
          />
          <button className="bg-primary text-white xs:p-4 p-3 rounded-lg">
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
              onClick={handleAdd}
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
