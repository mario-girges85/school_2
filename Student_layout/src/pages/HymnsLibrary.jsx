import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hymns from "../hymns/hymnsData";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { COLORS } from "../constants/colors";
import Input from "../components/ui/Input";

const HymnsLibrary = () => {
  const [selectedTab, setSelectedTab] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (hymnId, tab) => {
    setSelectedTab((prev) => ({ ...prev, [hymnId]: tab }));
  };

  const filteredHymns = hymns.filter(
    (hymn) =>
      hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hymn.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Hymns Library</h1>
      <div className="mb-6 flex justify-center">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or description..."
          className="w-full md:w-1/2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredHymns.map((hymn) => {
          return (
            <div
              key={hymn.id}
              className="relative group"
              onClick={() => navigate(`/hymns/${hymn.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card
                className="flex flex-col gap-3 pl-4 border-l-8 hover:shadow-2xl transition-shadow duration-200"
                shadow="lg"
                padding="sm"
              >
                {/* Badges at top right */}
                <div className="absolute top-4 right-6 flex gap-2 z-10">
                  <Badge variant="primary">{hymn.category}</Badge>
                  <Badge
                    variant={hymn.status === "active" ? "success" : "default"}
                  >
                    {hymn.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 pr-24">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-1 leading-tight">
                    {hymn.title}
                  </h2>
                  <p className="text-neutral-600 text-sm mb-1 line-clamp-2">
                    {hymn.description}
                  </p>
                  <div className="text-xs text-neutral-400 mb-2">
                    Added: {new Date(hymn.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {/* Audio play overlay */}
                {hymn.audioUrl && (
                  <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
                    <button
                      className="rounded-full p-2 shadow-lg focus:outline-none"
                      style={{
                        background: COLORS.primary[600],
                        color: COLORS.neutral[50],
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const audio = document.getElementById(
                          `audio-${hymn.id}`
                        );
                        if (audio) audio.play();
                      }}
                      title="Play Audio"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-6.518-3.855A1 1 0 007 8.132v7.736a1 1 0 001.234.97l6.518-1.855A1 1 0 0016 14.132V9.868a1 1 0 00-1.248-.7z"
                        />
                      </svg>
                    </button>
                    <audio
                      id={`audio-${hymn.id}`}
                      src={hymn.audioUrl}
                      preload="none"
                    />
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
      {filteredHymns.length === 0 && (
        <div className="text-center text-neutral-500 mt-8">No hymns found.</div>
      )}
    </div>
  );
};

export default HymnsLibrary;
