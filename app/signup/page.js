"use client";

import React from "react";
import Signup from "@/components/Signup";
import Layout from "@/components/Layout"; // ✅ Ensure the path is correct

const SignupPage = () => {
  return (
    <Layout>
      <div className="min-h-screen p-6 text-white">
        <Signup />
      </div>
    </Layout>
  );
};

export default SignupPage;
