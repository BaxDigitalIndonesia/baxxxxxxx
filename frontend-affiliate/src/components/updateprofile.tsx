"use client";
import { CardContent, CardFooter, CardTransparent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Profile } from "@/interface";
import {
  FETCH_PROFILE,
  PATCH_ADDRESS,
  PATCH_USER,
} from "@/app/api/profile/route";
import { useEffect, useState } from "react";
import regionsDataRaw from "../../public/assets/data/indonesia-region.json"; // Import JSON data
import { useRouter } from "next/navigation";

type Village = { id: string; district_id: string; name: string };
type District = {
  id: string;
  regency_id: string;
  name: string;
  villages: Village[];
};
type Regency = {
  id: string;
  province_id: string;
  name: string;
  districts: District[];
};
type Province = { id: string; name: string; regencies: Regency[] };

const regionsData = regionsDataRaw as Province[];

export default function UpdateProfile() {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [provinces] = useState<Province[]>(regionsData);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(true);
  const [formData, setFormData] = useState<Profile>({
    photo: null,
    birthday: "",
    age: "",
    job: "",
    gender: "MALE",
    country: "",
    region: "",
    city: "",
    district: "",
    village: "",
    street: "",
    postalcode: "",
    previewPoto: "",
    referralCode: "",
  });
  //console.log(formData);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provincename = e.target.value;
    const selectedProvince = provinces.find(
      (prov) => prov.name === provincename
    );
    setRegencies(selectedProvince?.regencies || []);
    setDistricts([]);
    setVillages([]);
    setFormData({
      ...formData,
      region: provincename,
      city: "",
      district: "",
      village: "",
    });
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regeencyName = e.target.value;
    const selectedRegency = regencies.find((reg) => reg.name === regeencyName);
    setDistricts(selectedRegency?.districts || []);
    setVillages([]);
    setFormData({ ...formData, city: regeencyName, district: "", village: "" });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const disctrictName = e.target.value;
    const selectedDistrict = districts.find(
      (dist) => dist.name === disctrictName
    );
    setVillages(selectedDistrict?.villages || []);
    setFormData({ ...formData, district: disctrictName, village: "" });
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const villageName = e.target.value;
    setFormData({ ...formData, village: villageName });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevContent) => ({
        ...prevContent,
        photo: file,
        previewPoto: previewUrl,
      }));
    }
  };
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0]; //get date only (YYYY-MM-DD)
  };
  // Fetch data profil dari API
  const fetchProfile = async () => {
    try {
      const res = await FETCH_PROFILE();
      if (!res.ok) {
        setError(res.message);
      }

      setProfile(res);
      setFormData({
        photo: res.profile.photo || null,
        birthday: formatDate(res.profile.birthday || ""),
        age: res.profile.age || "",
        job: res.profile.job || "",
        gender: res.profile.gender || "MALE",
        country: res.profile.address?.country || "",
        region: res.profile.address?.region || "",
        city: res.profile.address?.city || "",
        district: res.profile.address?.district || "",
        village: res.profile.address?.village || "",
        street: res.profile.address?.street || "",
        postalcode: res.profile.address?.postalcode || "",
        previewPoto: res.profile.photo || "",
        referralCode: res.profile.user.referralCode || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const UpdateProfile = async () => {
    try {
      setLoadingBtn(false);
      const responseProfile = await PATCH_USER(formData);
      const profileId = responseProfile.profile_user.id;

      const responseAddress = await PATCH_ADDRESS(formData, profileId);
      if (!responseAddress || !responseProfile) {
        setError(
          responseAddress ? responseAddress.message : responseProfile.message
        );
      }
      router.push("/dashboard/profile");
    } catch (error) {
      setError("Error on Occure when submit");
    } finally {
      setLoadingBtn(true);
    }
  };

  const urlReferral = `${baseUrl}/?referral-code=${formData.referralCode}`;

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="mx-auto flex flex-1 flex-col gap-4 items-center px-4 py-6 sm:px-6 md:px-8 lg:px-12 bg-transparent text-black">
      <div className="w-full max-w-[1055px]">
        <div className="flex flex-col">
          {loading ? (
            //skelton loader
            <main className="animate-pulse flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8">
              <div className="space-y-6 w-full md:w-1/3 ">
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="flex justify-center mb-6">
                  <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                  <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                  <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                </div>
              </div>
              <div className="space-y-6 w-full flex-auto">
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
              </div>
            </main>
          ) : (
            <main className="flex flex-col gap-3 md:flex-row md:gap-6 lg:gap-8  text-black">
              <div className="space-y-6 w-full md:w-1/3">
                <h1 className="text-2xl font-bold text-center md:text-left lg:text-center text-blue-700">
                  Profile Settings
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-center md:text-left lg:text-center">
                  Update your account information.
                </p>
                <p
                  className="text-gray-500 dark:text-gray-400 text-center md:text-left lg:text-center"
                  onClick={() => navigator.clipboard.writeText(urlReferral)}>
                  {urlReferral}
                </p>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative ">
                    <img
                      src={
                        formData.previewPoto ||
                        "https://i.pinimg.com/736x/3c/f1/4e/3cf14e43f0de6cb3f3adff9757647731.jpg"
                      }
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="absolute bottom-0 right-0 bg-blue-500 text-black rounded-full p-2 cursor-pointer hover:bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.25 2.25 0 113.182 3.182l-9.68 9.68a4.5 4.5 0 01-1.698 1.1l-4.222 1.408 1.408-4.222a4.5 4.5 0 011.1-1.698l9.68-9.68z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 6.75L17.25 4.5"
                        />
                      </svg>
                    </label>
                    <input
                      id="profilePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <CardContent className="space-y-4">
                  <div className="gap-2 ">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      placeholder="Enter your age"
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="gap-2">
                    <Label htmlFor="birthday">Birth Day</Label>
                    <Input
                      id="birthday"
                      placeholder="birth day"
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="gap-2">
                    <Label htmlFor="job">Job</Label>
                    <Input
                      id="job"
                      placeholder="Enter your job"
                      type="text"
                      name="job"
                      value={formData.job}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="border rounded-md px-3 py-2 w-full bg-transparent text-black">
                      <option
                        value="MALE"
                        className="bg-white">
                        Male
                      </option>
                      <option
                        value="FEMALE"
                        className="bg-white">
                        Female
                      </option>
                    </select>
                  </div>
                </CardContent>
              </div>
              <div className="w-full flex-auto ">
                <CardContent className="space-y-6">
                  <div className="gap-2">
                    <label
                      htmlFor="region"
                      className="text-black">
                      Region
                    </label>
                    <select
                      id="region"
                      value={formData.region}
                      onChange={handleProvinceChange}
                      className="w-full border rounded-md px-3 py-2">
                      <option value="">
                        {formData.region ? formData.region : "Select Region"}
                      </option>
                      {provinces.map((province) => (
                        <option
                          key={province.id}
                          value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="gap-2">
                    <label
                      htmlFor="city"
                      className="text-black">
                      City
                    </label>
                    <select
                      id="city"
                      value={formData.city}
                      onChange={handleRegencyChange}
                      className="w-full border rounded-md px-3 py-2">
                      <option value={formData.city}>
                        {formData.city ? formData.city : "Select City"}
                      </option>
                      {regencies.map((regency) => (
                        <option
                          key={regency.id}
                          value={regency.name}>
                          {regency.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="gap-2">
                    <label
                      htmlFor="district"
                      className="text-black">
                      District
                    </label>
                    <select
                      id="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className="w-full border rounded-md px-3 py-2">
                      <option value={formData.district}>
                        {formData.district
                          ? formData.district
                          : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option
                          key={district.id}
                          value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="gap-2 ">
                    <label
                      htmlFor="village"
                      className="text-black">
                      Village
                    </label>
                    <select
                      id="village"
                      value={formData.village}
                      onChange={handleVillageChange}
                      className="w-full border rounded-md px-3 py-2">
                      <option value={formData.village}>
                        {formData.village ? formData.village : "Select Village"}
                      </option>
                      {villages.map((village) => (
                        <option
                          key={village.id}
                          value={village.name}>
                          {village.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="gap-2">
                    <label
                      htmlFor="street"
                      className="text-black">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      placeholder="Enter your street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="gap-2">
                    <label
                      htmlFor="postalcode"
                      className="text-black">
                      Postal Code
                    </label>
                    <input
                      id="postalcode"
                      name="postalcode"
                      placeholder="Enter your postal code"
                      value={formData.postalcode}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="ml-auto w-full md:w-auto mb-3 mr-3"
                    onClick={UpdateProfile}>
                    {loadingBtn ? (
                      "Save"
                    ) : (
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
                        Save...
                      </>
                    )}
                  </Button>
                </CardFooter>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
