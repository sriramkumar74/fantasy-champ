import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit2, Save, X, Trophy, Users, TrendingUp, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    teamName: "Thunder XI",
    bio: "Cricket enthusiast and fantasy league champion. Love analyzing player stats and building winning strategies.",
  });
  const [editForm, setEditForm] = useState(form);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setForm(editForm);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditForm(form);
    setEditing(false);
  };

  const stats = [
    { label: "Leagues Joined", value: 5, icon: Users },
    { label: "Total Points", value: 1842, icon: TrendingUp },
    { label: "Wins", value: 3, icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Header Card */}
          <div className="bg-card rounded-lg shadow-card p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar with upload */}
              <div className="relative group">
                <Avatar className="w-24 h-24 text-2xl">
                  <AvatarImage src={profileImage || undefined} alt={form.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                    {form.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute inset-0 flex items-center justify-center bg-foreground/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer fc-transition">
                  <Camera size={20} className="text-background" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div className="flex-1 text-center sm:text-left">
                {editing ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Full Name"
                      className="text-lg font-bold"
                    />
                    <Input
                      value={editForm.teamName}
                      onChange={(e) => setEditForm({ ...editForm, teamName: e.target.value })}
                      placeholder="Team Name"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-bold">{form.name}</h1>
                    <Badge variant="default" className="mt-1">{form.teamName}</Badge>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {editing ? (
                  <>
                    <Button size="sm" onClick={handleSave} className="gap-1">
                      <Save size={14} /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1">
                      <X size={14} /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="gap-1">
                    <Edit2 size={14} /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg shadow-card p-4 text-center"
              >
                <stat.icon size={20} className="mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Details Card */}
          <div className="bg-card rounded-lg shadow-card p-6">
            <h3 className="text-sm font-bold mb-4">Personal Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-muted-foreground" />
                {editing ? (
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    type="email"
                  />
                ) : (
                  <span className="text-sm">{form.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-muted-foreground" />
                {editing ? (
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                ) : (
                  <span className="text-sm">{form.phone}</span>
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Bio</p>
                {editing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full bg-secondary rounded-md p-3 text-sm border-0 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{form.bio}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
