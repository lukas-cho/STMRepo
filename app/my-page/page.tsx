"use client"
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileEditModal from "@/components/ProfileEditModal";
import { type Session } from "next-auth"
import { getMyProfile } from "@/actions/getMyProfile";
import { useRouter } from "next/navigation";

export default function MyPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<Session["user"] | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null = 로딩 중
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    // // Update after the modal closed : session.user.* -> profile.*

    const loadProfile = async () => {
        const data = await getMyProfile();
        console.log(data.profile)
        setProfile(data.profile);
        setLoggedIn(data.loggedIn);
    };

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (loggedIn === false) {
            router.replace("/login");
        }
    }, [loggedIn]);

    if (!session?.user) {
        redirect("/login");
    }

    if (loggedIn === null) return <p>Loading...</p>; // fetch 중
    if (!profile) return <p>No profile found.</p>;

    return (
        <div className="max-w-md mx-auto mt-10 space-y-3">
            <h1 className="text-2xl font-bold mb-4">My Page</h1>
            <p>Welcome, {session.user.name}.</p>
            <p>Your user ID is {session.user.id}.</p>
            <p>Your email is {session.user.email}.</p>
            <p>Your phone number is {profile.phone}.</p>
            <p>Your address is {profile.address}.</p>
            <p>Your city is {profile.city}.</p>
            <p>Your state code is {profile.state}.</p>
            <p>Your zip code is {profile.zip}.</p>

            <div className="flex gap-2">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Edit Profile
                </button>

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Log out
                </button>
            </div>


{showModal && profile && (
  <ProfileEditModal
    initialProfile={{
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      zip: profile.zip ?? ""
    }}
    onClose={() => setShowModal(false)}
    onSave={loadProfile}
  />
)}
        </div>
    );
}
