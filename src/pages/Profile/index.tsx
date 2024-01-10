import { FunctionComponent, useEffect } from "react";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  return (
    <div className="text-center mt-28 text-[30px] font-[600]">
      Site Diary Reporting
    </div>
  );
};

export default ProfilePage;
