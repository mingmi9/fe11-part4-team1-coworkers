import MemberCard from "./MemberCard";

const mockData = [
    {
        profileImg: "",
        name: "김예도",
        email: "kim.yedo@example.com",
    },
    {
        profileImg: "",
        name: "노건호",
        email: "noh.gunho@example.com",
    },
    {
        profileImg: "",
        name: "이지은",
        email: "lee.jieun@example.com",
    },
    {
        profileImg: "",
        name: "박효신",
        email: "park.hyo-shin@example.com",
    },
    {
        profileImg: "",
        name: "정국",
        email: "jeon.jungkook@example.com",
    },
];

export default function MemberSection() {
    return (
        <div className="text-text-primary text-[1.6rem] pc:w-[120rem] tablet:[69.6rem] mobile:[34.3rem]">
            <div className="flex justify-between mb-[2.4rem]">
                <div>
            멤버 <span className="text-text-default">({mockData.length}명)</span>
            </div>
                <button className="text-brand-primary hover:brightness-150">
                    + 새로운 멤버 초대하기
                </button>
            </div>
            <div className="flex flex-wrap gap-[2.4rem]">
                {mockData.map((member, index) => (
                    <MemberCard
                        key={index}
                        profileImg={member.profileImg}
                        name={member.name}
                        email={member.email}
                    />
                ))}
            </div>
        </div>
    )
}