import React from "react";
import Details from "../componentes/Details";
import PostComments from "../componentes/PostComments";
import ViewComments from "../componentes/ViewComments";

export default function GamePage() {
  return (
    <div>
      <Details />
      <PostComments />
      <ViewComments />
    </div>
  );
}
