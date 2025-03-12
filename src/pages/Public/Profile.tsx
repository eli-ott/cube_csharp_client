import React from "react";
import CustomerProfile from "../../features/Profile/CustomerProfile";
import CustomerReviewsTable from "../../features/Profile/CustomerReviewsTable";

const Profile: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-8 p-4">
      <CustomerProfile />
      <CustomerReviewsTable/>
    </main>
  );
};

export default Profile;
