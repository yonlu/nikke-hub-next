import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Notification } from "../../components/Notification";

export default function Manage() {
  const [imgData, setImgData] = useState("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const addNikke = useMutation((newNikke: any) =>
    axios({
      method: "post",
      url: "http://localhost:3000/nikke/",
      data: newNikke,
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

  const { register, handleSubmit, getValues } = useForm();
  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    const details = {
      info: {
        name: data.name as string,
        rarity: data.rarity as string,
        burst: data.burst as string,
        code: data.code as string,
        weapon: data.weapon as string,
      },
    };
    formData.append("details", JSON.stringify(details));
    formData.append("imageFile", data.imageFile[0]);
    addNikke.mutate(formData, {
      onSuccess: () => setShowNotification(!showNotification),
    });
  };

  const onChangePicture = (e: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (reader.result) {
        setImgData(reader.result as string);
      }
    });
    reader.readAsDataURL(e.target.files[0]);

    return e.target.files;
  };

  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8 bg-gray-50 text-black">
      {showNotification && <Notification name={getValues("name")} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  About
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={""}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Cover photo
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="imageFile"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="imageFile"
                            {...register("imageFile", {
                              onChange: (e) => onChangePicture(e),
                            })}
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <img src={imgData} />
          </div>
          <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Nikke Information
              </h3>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    {...register("name")}
                    autoComplete="given-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="rarity"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Rarity
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register("rarity")}
                    id="rarity"
                    autoComplete="rarity-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  >
                    <option>R</option>
                    <option>SR</option>
                    <option>SSR</option>
                  </select>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Code
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    {...register("code")}
                    id="code"
                    autoComplete="code-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  >
                    <option>ANMI</option>
                    <option>DMTR</option>
                    <option>HSTA</option>
                    <option>PSID</option>
                    <option>ZEUS</option>
                  </select>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Weapon
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    id="weapon"
                    {...register("weapon")}
                    name="weapon"
                    autoComplete="weapon-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  >
                    <option>AR</option>
                    <option>MG</option>
                    <option>RL</option>
                    <option>SG</option>
                    <option>SMG</option>
                    <option>SR</option>
                  </select>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="burst"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Burst
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <select
                    id="burst"
                    {...register("burst")}
                    autoComplete="burst-name"
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  >
                    <option>I</option>
                    <option>II</option>
                    <option>III</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addNikke.isLoading}
              className="ml-3 inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {addNikke.isLoading && (
                <svg
                  role="status"
                  className="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {addNikke.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
