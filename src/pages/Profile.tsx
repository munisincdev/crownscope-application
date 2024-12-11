import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Edit, Upload, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { UploadDocumentDialog } from "@/components/profile/UploadDocumentDialog";

const Profile = () => {
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showUploadDocument, setShowUploadDocument] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary hover:text-primary-light hover:bg-primary/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-headers text-primary">Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profileImage || undefined} />
                <AvatarFallback className="bg-primary/10">
                  <User className="w-12 h-12 text-primary" />
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 p-2 bg-primary hover:bg-primary-light text-white rounded-full cursor-pointer shadow-md transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <span className="text-secondary hover:text-secondary-light text-sm cursor-pointer transition-colors">
              Change picture
            </span>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Brian Kachumbari</h2>
                <p className="text-gray-500">brian.k@gmail.com</p>
              </div>
              <Button 
                variant="ghost"
                className="text-secondary hover:text-white hover:bg-secondary transition-colors"
                onClick={() => setShowEditProfile(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div>
              <p className="text-sm text-gray-500">Member since: 12 October 2024</p>
            </div>

            {/* Documents Section */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Documents on file:</h3>
                <Button 
                  variant="ghost"
                  className="text-secondary hover:text-white hover:bg-secondary transition-colors"
                  onClick={() => setShowUploadDocument(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <User className="w-5 h-5 text-primary" />
                  Copy of ID
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileDialog 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile}
      />
      
      <UploadDocumentDialog 
        open={showUploadDocument} 
        onOpenChange={setShowUploadDocument}
      />
    </div>
  );
};

export default Profile;