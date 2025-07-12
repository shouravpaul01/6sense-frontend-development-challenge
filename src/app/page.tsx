"use client";

import { AddIcon, DeleteIcon } from "@/components/icons";
import { professionOptions } from "@/constant";
import { TUserInfo } from "@/types";
import { useState } from "react";

// import { AddIcon, DeleteIcon } from "@/components/icons";

export default function Home() {
  const [totalUserFieldData, setTotalUserFieldData] = useState<TUserInfo[]>([
    { _id: 1, name: "", profession: "" },
  ]);
  const [totalUserData, setTotalUserData] = useState<TUserInfo[] | []>([]);
  const handleAdd = () => {
    const uniqueId = Math.floor(Math.random() * (10000 - 2 + 1)) + 2;
    setTotalUserFieldData((prev) => [
      ...prev,
      { _id: uniqueId, name: "", profession: "" },
    ]);
  };
  const handleDeleteField = (_id: number) => {
    if (totalUserFieldData.length === 1) return;

    const filterUserData = totalUserFieldData?.filter(
      (user) => user._id !== _id
    );

    setTotalUserFieldData([...filterUserData]);
  };
  console.log(totalUserFieldData);
  const handleNameInput = (_id: number, value: string) => {
    const updateData = totalUserFieldData?.map((user) => {
      if (user._id === _id) {
        return { _id, name: value, profession: user.profession };
      }
      return user;
    });
    setTotalUserFieldData(updateData);
  };
  const handleProfessionSelect = (_id: number, value: string) => {
    const updateData = totalUserFieldData?.map((user) => {
      if (user._id === _id) {
        return { _id, name: user.name, profession: value };
      }
      return user;
    });
    setTotalUserFieldData(updateData);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTotalUserData(totalUserFieldData);
  };
  return (
    <div className="my-container">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-2">
        {totalUserFieldData?.map((field, index) => (
          <div key={field._id} className="flex flex-col md:flex-row gap-2 ">
            <div className="w-full flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="input"
                onChange={(e) => handleNameInput(field._id, e.target.value)}
              />
            </div>

            <div className="w-full  flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                Select a Car
              </label>
              <select
                className="input "
                onChange={(e) =>
                  handleProfessionSelect(field._id, e.target.value)
                }
              >
                <option value="">-- Choose a car --</option>
                {professionOptions?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="size-10 flex justify-center items-center mt-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => handleDeleteField(field._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            className="size-10 flex justify-center items-center bg-blue-600  rounded-md hover:bg-blue-700 transition"
            onClick={() => handleAdd()}
          >
            <AddIcon />
          </button>
          <button
            type="submit"
            className=" p-2 bg-blue-600  rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <table className="table-auto md:table-fixed">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Profession</th>
            </tr>
          </thead>
          <tbody>
            {totalUserData?.map((user, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{user.name}</td>
                <td>{user.profession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
