"use client";

import {
  GET_AFFILIATE,
  GET_FILTERED_AFFILIATE,
} from "@/app/api/teamList/route";
import PageTitle from "@/components/pagetitle";
import SearchBarWithButton from "@/components/searchbar";
import { TeamlistTable } from "@/components/teamlist-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HandlerForm from "@/handler/form-input";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

type Props = {};
type Payment = {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p>{row.getValue("name")} </p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

export default function Teamlist({}: Props) {
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    handleSubmit,
    handleInputChange,
    phoneError,
    nameError,
    passwordError,
    emailError,
    formData,
    loadingSubmit,
  } = HandlerForm();

  const GetAffiliate = async () => {
    try {
      const response = await GET_AFFILIATE();
      setFilteredData(response);
      // console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await GET_FILTERED_AFFILIATE(query);
      setFilteredData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const sendForm = async (e: React.FormEvent) => {
    try {
      const response = await handleSubmit(e);
      // console.log("response : ", response);
      setIsDialogOpen(false);
      // setFilteredData(response as Payment[]);
      GetAffiliate();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetAffiliate();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full p-5 text-black">
      <div className="mt-2 mb-2 flex justify-between">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <PageTitle title="Teamlist " />
            <Dialog.Root
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}>
              <Dialog.Trigger asChild>
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Add Team +
                </Button>
              </Dialog.Trigger>
              <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <VisuallyHidden>
                    <Dialog.Title className="text-lg font-bold mb-2">
                      Add Team
                    </Dialog.Title>
                  </VisuallyHidden>
                  <Dialog.Content className="text-sm text-gray-600 mb-4">
                    Please fill in the following details to add a new team
                    member.
                  </Dialog.Content>
                  <div className="flex flex-col gap-4">
                    <Input
                      className="border border-gray-300 p-2 rounded w-full"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      required
                      onChange={handleInputChange}
                    />
                    {nameError && (
                      <p className="mt-2 text-sm text-red-600">{nameError}</p>
                    )}
                    <Input
                      className="border border-gray-300 p-2 rounded w-full"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600">{emailError}</p>
                    )}
                    <Input
                      className="border border-gray-300 p-2 rounded w-full"
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {phoneError && (
                      <p className="mt-2 text-sm text-red-600">{phoneError}</p>
                    )}
                    {/* <Input
                  className="border border-gray-300 p-2 rounded w-full"
                  name="ReferalId"
                  placeholder="Your Referral code"
                  value={formData.ReferalId}
                  onChange={handleInputChange}
                /> */}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Dialog.Close asChild>
                      <Button className="bg-red-600 px-4 py-2 rounded hover:bg-gray-300 transition">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button
                      type="submit"
                      className={` border border-transparent rounded-md shadow-sm text-white ${
                        loadingSubmit
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      // onClick={handleSubmit}
                      onClick={sendForm}
                      disabled={loadingSubmit}>
                      {loadingSubmit ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                          Submit...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </form>
        <section className="mb-2 flex justify-end">
          <SearchBarWithButton onSearch={handleSearch} />
        </section>
      </div>
      <TeamlistTable
        columns={columns}
        data={filteredData}
      />
    </div>
  );
}
