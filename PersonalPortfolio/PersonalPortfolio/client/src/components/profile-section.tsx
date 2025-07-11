import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Camera, Edit, Linkedin, Github, Twitter, Mail } from "lucide-react";
import EditProfileModal from "./edit-profile-modal";

interface ProfileSectionProps {
  isAdmin: boolean;
}

export default function ProfileSection({ isAdmin }: ProfileSectionProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: isAdmin ? ["/api/profile/me"] : ["/api/profile"],
    retry: false,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-pulse">
            <div className="w-48 h-48 bg-slate-200 rounded-full mx-auto mb-8"></div>
            <div className="h-12 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            {/* Profile Photo Container */}
            <div className="relative inline-block mb-8">
              <img
                src={profile?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"}
                alt="Profile Photo"
                className="w-48 h-48 rounded-full object-cover shadow-2xl ring-4 ring-white mx-auto transition-transform duration-300 hover:scale-105"
              />

              {/* Edit Photo Button (Admin Mode) */}
              {isAdmin && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="absolute inset-0 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                >
                  <Camera className="h-8 w-8" />
                </button>
              )}
            </div>

            {/* Name and Title */}
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-slate-900 mb-4 animate-slide-up">
                {profile?.name || "John Developer"}
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-slide-up">
                {profile?.title || "Full Stack Developer & UI/UX Designer passionate about creating beautiful, functional web experiences"}
              </p>

              {/* Edit Profile Button (Admin Mode) */}
              {isAdmin && (
                <Button
                  onClick={() => setShowEditModal(true)}
                  className="mt-4"
                  variant="outline"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-2xl">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-2xl">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-2xl">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors text-2xl">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
