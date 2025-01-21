'use client';

import MemberSection from "@/_components/TeamPage/MemberSection";
import { useParams } from "next/navigation";

const mockData = [
    {
        profileImg: "",
        name: "코드잇",
        email: "codeit@example.com",
    },
    {
        profileImg: "",
        name: "코드잇2",
        email: "codeit2@example.com",
    },
    {
        profileImg: "",
        name: "코드잇3",
        email: "codeit3@example.com",
    },
    {
        profileImg: "",
        name: "코드잇4",
        email: "codeit4@example.com",
    },
    {
        profileImg: "",
        name: "코드잇5",
        email: "codeit5@example.com",
    },
    {
        profileImg: "",
        name: "코드잇6",
        email: "codeit6@example.com",
    },

    
]; // 임시 mockData

export default function TeamPage () {
    const {teamid} = useParams();
    return(
        <div className="bg-black">
            <MemberSection member={mockData}/>
            <div className="text-white">
                {teamid} {/*테스트용*/}
            </div>
        </div>
    )
}