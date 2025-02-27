import ProfileSideBar from "@/components/ProfileComponents/ProfileSideBar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="my-6 md:my-12">
        <div className="mx-4 lg:mx-12">
          <div className="flex gap-6 lg:gap-[80px] xl:gap-[116px] items-start justify-center">
            <ProfileSideBar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
