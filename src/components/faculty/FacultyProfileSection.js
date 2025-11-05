import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { User, Mail, Phone, MapPin, Award, BookOpen, Save } from "lucide-react";
import { Separator } from "../ui/separator";

export default function FacultyProfileSection({ facultyData }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: facultyData.name || "Dr. John Smith",
    email: facultyData.email || "john.smith@university.edu",
    phone: facultyData.phone || "+1 (555) 123-4567",
    department: facultyData.department || "Computer Science",
    designation: facultyData.designation || "Associate Professor",
    qualification: facultyData.qualification || "Ph.D. in Computer Science",
    experience: facultyData.experience || "12 years",
    bio: "Passionate educator and researcher with expertise in algorithms, data structures, and machine learning. Committed to fostering student growth and innovation.",
    officeLocation: "Building A, Room 305",
    officeHours: "Monday & Wednesday, 3:00 PM - 5:00 PM",
  });

  const specializations = [
    "Algorithms",
    "Data Structures",
    "Machine Learning",
    "Artificial Intelligence",
  ];

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <User className="h-6 w-6" />
              Faculty Profile
            </CardTitle>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl text-slate-100 mb-1">
                {profileData.name}
              </h2>
              <p className="text-slate-400 mb-3">
                {profileData.designation}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {specializations.map((spec) => (
                  <Badge key={spec} variant="secondary" className="bg-slate-600 text-slate-100">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.name}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.email}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.phone}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <BookOpen className="h-4 w-4" />
                  Department
                </Label>
                {isEditing ? (
                  <Input
                    value={profileData.department}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        department: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.department}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <Award className="h-4 w-4" />
                  Qualification
                </Label>
                {isEditing ? (
                  <Input
                    value={profileData.qualification}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        qualification: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.qualification}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 text-slate-300">Experience</Label>
                {isEditing ? (
                  <Input
                    value={profileData.experience}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        experience: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.experience}
                  </p>
                )}
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-slate-300">
                  <MapPin className="h-4 w-4" />
                  Office Location
                </Label>
                {isEditing ? (
                  <Input
                    value={profileData.officeLocation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        officeLocation: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.officeLocation}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 text-slate-300">Office Hours</Label>
                {isEditing ? (
                  <Input
                    value={profileData.officeHours}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        officeHours: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                ) : (
                  <p className="text-slate-300">
                    {profileData.officeHours}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2 text-slate-300">Biography</Label>
            {isEditing ? (
              <Textarea
                rows={4}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-slate-100"
              />
            ) : (
              <p className="text-slate-300">
                {profileData.bio}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
