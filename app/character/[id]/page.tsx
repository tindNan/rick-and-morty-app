import { getCharacter } from "rickmortyapi";
import Image from "next/image";
import React from "react";
import CommentSection from "@/components/CommentSection";

async function getCharacterInfoAndComments(id: string) {
  const res = await getCharacter(parseInt(id));

  if (res.status !== 200) {
    throw new Error("Could not fetch character information");
  }

  return res.data;
}

export default async function CharacterPage(props: { params: { id: string } }) {
  const characterInfo = await getCharacterInfoAndComments(props.params.id);

  return (
    <div className="flex flex-col items-center w-full sm:px-32">
      <div className="hero bg-base-200 rounded">
        <div className="hero-content flex-col sm:flex-row">
          <div className="w-80 h-80">
            <Image
              src={characterInfo.image}
              alt={`${characterInfo.name}'s avatar`}
              height={320}
              width={320}
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-bold">{characterInfo.name}</h1>
            <p className="text-xl">Status: {characterInfo.status}</p>
            <p>Species: {characterInfo.species}</p>
            <p>Gender: {characterInfo.gender}</p>
            <p>Origin: {characterInfo.origin.name}</p>
            <p>Location: {characterInfo.location.name}</p>
          </div>
        </div>
      </div>
      <CommentSection />
    </div>
  );
}
