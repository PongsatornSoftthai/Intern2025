"use client";
import { useParams } from "next/navigation";

export default function EditSubjects() {
  const { id } = useParams();
  return <div>Delete Teacher ID: {id}</div>;
}
