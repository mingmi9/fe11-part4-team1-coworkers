import MemberSection from "@/_components/TeamPage/MemberSection";
// import { useRouter } from "next/router";

export default function TeamPage () {
    // const router = useRouter();
    // const {teamid} = router.query;
    return(
        <div className="bg-black">
            <MemberSection/>
            {/* {teamid} */}
        </div>
    )
}