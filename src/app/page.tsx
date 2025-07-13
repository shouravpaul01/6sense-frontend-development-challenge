"use client";

import { AddIcon, DeleteIcon } from "@/components/icons";
import { professionOptions } from "@/constant";
import { TUserInfo } from "@/types";
import { useState } from "react";


export default function Home() {
  const [totalUserFieldData, setTotalUserFieldData] = useState<TUserInfo[]>([
    { _id: 1, name: "", profession: "" },
  ]);
  const [errors, setErrors] = useState<
    Record<number, { name?: string; profession?: string }>
  >({});
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
    const newErrors: Record<number, { name?: string; profession?: string }> =
      {};
    totalUserFieldData.forEach((user) => {
      const userErrors: { name?: string; profession?: string } = {};
      if (!user.name.trim()) {
        userErrors.name = "Name is required";
      }
      if (!user.profession.trim()) {
        userErrors.profession = "Profession is required";
      }
      if (Object.keys(userErrors).length > 0) {
        newErrors[user._id] = userErrors;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("object");
      setTotalUserData(totalUserFieldData);
    } else {
      setTotalUserData([]);
    }
  };
  console.log(errors, "erro", totalUserData);
  return (
    <div className="my-container">
      <div className="bg-[#44bda9] h-16 flex items-center justify-center rounded-b-md">
        <h1 className="font-bold text-2xl md:text-3xl text-center">
          Frontend Development Challenge
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-2 my-6">
        {totalUserFieldData?.map((field) => (
          <div key={field._id} className="flex flex-col md:flex-row gap-2 ">
            <div className="w-full flex flex-col gap-1">
              <label className=" text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="input"
                onChange={(e) => handleNameInput(field._id, e.target.value)}
              />
              {errors[field._id]?.name && (
                <span className="text-red-500 text-xs ">
                  {errors[field._id].name}
                </span>
              )}
            </div>

            <div className="w-full  flex flex-col gap-1">
              <label className=" text-sm font-medium text-gray-700">
                Profession
              </label>
              <select
                className="input "
                onChange={(e) =>
                  handleProfessionSelect(field._id, e.target.value)
                }
              >
                <option value="">-- Select a Profession --</option>
                {professionOptions?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[field._id]?.profession && (
                <span className="text-red-500 text-xs ">
                  {errors[field._id].profession}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                className="size-10 flex justify-center items-center mt-6 outline-1 outline-gray-300  rounded-md hover:bg-red-400 transition"
                onClick={() => handleDeleteField(field._id)}
              >
                <DeleteIcon className="fill-gray-500 size-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            className="size-10 flex justify-center items-center outline-2 outline-gray-300 rounded-md hover:bg-[#44bda9] transition"
            onClick={() => handleAdd()}
          >
            <AddIcon className="fill-gray-500 size-6" />
          </button>
          <button type="submit" className=" p-2 bg-[#44bda9]  rounded-md  hover:scale-110 hover:duration-300">
            Submit
          </button>
        </div>
      </form>
      <div className="max-w-5xl mx-auto">
        <table className="table-auto md:table-fixed w-full rounded-md   text-sm text-left text-gray-700">
          <thead className="bg-slate-400 text-white rounded-md  ">
            <tr>
              <th className="px-4 py-2 w-12">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Profession</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {totalUserData?.length == 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 font-medium">
                  Data not found
                </td>
              </tr>
            ) : (
              totalUserData?.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.profession}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
