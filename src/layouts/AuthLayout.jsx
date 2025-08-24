import { Outlet } from "react-router-dom";
import InstallPwaButton from "../components/InstallPwaButton";
import EnablePushButton from "../components/EnablePushButton";
import IosA2hsHint from "./components/IosA2hsHint";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <InstallPwaButton />
      <IosA2hsHint />
      <EnablePushButton className="ml-2" />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
