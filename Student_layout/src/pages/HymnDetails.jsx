import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import hymns from "../hymns/hymnsData";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

const HymnDetails = () => {
  const { hymnId } = useParams();
  const navigate = useNavigate();
  const hymn = hymns.find((h) => h.id === Number(hymnId));

  if (!hymn) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Hymn Not Found</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8">
      <Card className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">{hymn.title}</h1>
        <p className="text-neutral-600 text-lg mb-2">{hymn.description}</p>
        <div className="flex gap-2 mb-2">
          <Badge variant="primary">{hymn.category}</Badge>
          <Badge variant={hymn.status === "active" ? "success" : "default"}>
            {hymn.status}
          </Badge>
        </div>
        <div className="text-xs text-neutral-500 mb-2">
          Added: {new Date(hymn.createdAt).toLocaleDateString()}
        </div>
        {hymn.audioUrl && (
          <audio controls className="w-full mb-4">
            <source src={hymn.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1 text-center">
              Coptic Lyrics
            </h2>
            <div className="bg-white border border-neutral-200 rounded-md p-3 whitespace-pre-line min-h-[80px]">
              {hymn.copticLyrics}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1 text-center">
              Arabic Lyrics
            </h2>
            <div className="bg-white border border-neutral-200 rounded-md p-3 whitespace-pre-line min-h-[80px]">
              {hymn.arabicLyrics}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1 text-center">
              Coptic-Arabic Lyrics
            </h2>
            <div className="bg-white border border-neutral-200 rounded-md p-3 whitespace-pre-line min-h-[80px]">
              {hymn.arabicCopticLyrics}
            </div>
          </div>
        </div>
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md self-start"
          onClick={() => navigate(-1)}
        >
          Back to Library
        </button>
      </Card>
    </div>
  );
};

export default HymnDetails;
