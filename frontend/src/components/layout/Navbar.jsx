"use client";
import { useRef, useState } from "react"
import Image from "next/image";
import Link from "next/link";

import { optimizeImageUrl } from "@/utils/utils.helper";
import { useGetMe } from "@/queries/auth.query";

import useChatStore from "@/store/chat/chat.store.js";
import useUIStore from "@/store/ui.store.js";
import {MIN_SEARCH_WORD_LENGTH} from "@/hooks/useGlobalSearch";

import { Bell, MessageCircle, Plus } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

import ThemeToggle from "./ThemeToggle";
import NavDropdown from "./NavDropdown";
import SearchBar from "@/components/explore/SearchBar";

import { LinkButton } from "../ui/Button";
import {toggleNotification} from "@/store/notification/notification.store.js";



function NavbarUserSect() {
  const { data, isLoading, isError, error } = useGetMe();


  const hasNewMessages = useChatStore(store => 
      Object.values(store.newMessageCount).some(count => count > 0)
  );

  return (
    <section className={`flex items-center gap-3`}>
      {data && data.role === "guide" && (
        <LinkButton size={"sm"} variant="outline" href={"/explore/packages/create"}>
          <div className="flex gap-2 items-center" >
            Create Package
            <span> <Plus size={15} /> </span>

          </div>
        </LinkButton>
      )}

      <div className="flex text-text cursor-pointer hover:bg-secondary p-2 rounded-md">
        <ThemeToggle />
      </div>
      {data ? (
        <>
          <Link
            href={"/chat"}
            className="text-text  hover:bg-secondary p-2 rounded-md relative"
          >
            <MessageCircle size={20} />

            <div
              className={`rounded-full h-2 w-2 bg-red-500 absolute top-2 right-2 ${hasNewMessages ? "opacity-100" : "opacity-0" } `}
            />

          </Link>

          <button
            type="button"
            onClick={toggleNotification}
            className="text-text hover:bg-secondary p-2 rounded-md cursor-pointer "
          >
            <Bell size={20} />
          </button>

          <Link
            href={`/dashboard`}
            className="border-2 border-primary rounded-full cursor-pointer hover:bg-primary"
          >
            <Avatar
              src={data?.profilePicture?.src}
              alt={data?.name}
              size={"xs"}
            />
          </Link>
        </>
      ) : (
        <>
          <LinkButton href={"/login"} variant="outline">
            Sign In
          </LinkButton>

          <LinkButton href={"/register"} variant="primary">
            Sign Up
          </LinkButton>
        </>
      )}
    </section>
  );
}

export default function Navbar() {

  const [inputValue, setInputValue] = useState("");
  const debounce = useRef(null);

  const setSearchModalWord = useUIStore((s) => s.setSearchModalWord);
  const setIsSearchModalOpen = useUIStore((s) => s.setIsSearchModalOpen);

  const handleSearchWords = (e) => {
      const value = e.target.value;
      setInputValue(value);
      
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        setSearchModalWord(value);
      }, 300);
  };


  return (
    <header className=" flex justify-between items-center gap-8 bg-secondary/35 dark:bg-secondary/15 backdrop-blur-3xl py-2 px-9 z-30">
      <NavDropdown />

      <div className="flex-1 hidden md:flex" >

        <SearchBar
          value={inputValue}
          onChange={handleSearchWords}
          onFocus={()=> setIsSearchModalOpen(true)}
          // onBlur={()=> setIsSearchModalOpen(false)}
        />

      </div>

      <NavbarUserSect />
    </header>
  );
}
