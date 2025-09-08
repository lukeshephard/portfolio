'use client'
import Card from "../utils/card";
import CardArray from "../utils/cardArray";

export default function Projects() {
  return (
      <>
          <div className="flex flex-col items-center text-text">
            <h2 className={"text-5xl pb-10 text-text-title"}>My Project History</h2>
            <CardArray>
              <Card title="Project 1">
                Project 1 goes here
              </Card>
              <Card title="Project 2">
                Project 2 goes here
              </Card>
            </CardArray>
          </div>
      </>
  );
}
