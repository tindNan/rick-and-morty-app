import { getCharacter } from "rickmortyapi";
import Image from "next/image";
import React from "react";
import CommentSection from "@/components/CommentSection";

async function getCharacterInfoAndComments(id: string) {
  const res = await getCharacter(parseInt(id));

  if (res.status !== 200) {
    throw new Error("Could not fetch character information");
  }

  // TODO: add ability to also load the comment info
  return res.data;
}

export default async function CharacterPage(props: { params: { id: string } }) {
  const characterInfo = await getCharacterInfoAndComments(props.params.id);

  return (
    <div className="flex flex-col items-center w-full sm:px-32">
      <div className="flex justify-between px-8 sm:px-32 w-full">
        <div className="w-80 h-80">
          <Image
            src={characterInfo.image}
            alt={`${characterInfo.name}'s avatar`}
            height={320}
            width={320}
          />
        </div>
        <div>
          <p>Name: {characterInfo.name}</p>
          <p>Status: {characterInfo.status}</p>
          <p>Species: {characterInfo.species}</p>
          <p>Gender: {characterInfo.gender}</p>
          <p>Origin: {characterInfo.origin.name}</p>
          <p>Location: {characterInfo.location.name}</p>
        </div>
      </div>
      <CommentSection />
    </div>
  );
}
