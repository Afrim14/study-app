import React from 'react';

const LectureView = ({ lecture, onBack }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button 
          className="btn btn-outline"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        <h1 className="page-title mb-0">{lecture?.title || 'Human Evolution'}</h1>
      </div>

      <div className="card">
        <div className="mb-4">
          <img 
            src={lecture?.thumbnail || '/api/placeholder/800/450'} 
            alt={lecture?.title || 'Lecture thumbnail'} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-medium mb-2">{lecture?.title || 'Human Evolution'}</h2>
          <p className="text-sm text-light mb-4">
            {lecture?.description || 'Lecture on the origins and stages of human evolution, covering important concepts and discoveries.'}
          </p>
        </div>

        <div className="bg-primary bg-opacity-5 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Lecture Notes</h3>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-medium">Origins of Humankind</h4>
              <p className="text-sm">The human lineage split from that of apes around 7 million years ago in Africa. The first bipedal human ancestors were Australopithecines, which appeared about 4 million years ago.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Homo Sapiens Emergence</h4>
              <p className="text-sm">Modern humans (Homo sapiens) evolved in Africa about 300,000 years ago. They migrated out of Africa around 70,000-50,000 years ago and spread across the globe.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Cultural Evolution</h4>
              <p className="text-sm">Human cultural evolution has been marked by several revolutions: cognitive (70,000 years ago), agricultural (12,000 years ago), and industrial (250 years ago).</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-2">Additional Resources</h3>
          <div className="flex flex-col gap-2">
            <button className="text-primary text-sm flex items-center text-left">
              <i className="fas fa-file-pdf mr-2"></i>
              Evolution Timeline PDF
            </button>
            <button className="text-primary text-sm flex items-center text-left">
              <i className="fas fa-external-link-alt mr-2"></i>
              Interactive Human Evolution Map
            </button>
            <button className="text-primary text-sm flex items-center text-left">
              <i className="fas fa-video mr-2"></i>
              Supplementary Video: "The Human Journey"
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium mb-2">Discussion Questions</h3>
          <ol className="list-decimal pl-5 text-sm">
            <li className="mb-2">How did bipedalism change the course of human evolution?</li>
            <li className="mb-2">What advantages did larger brains provide to early humans?</li>
            <li className="mb-2">How did tool use affect human development?</li>
            <li>What role did climate change play in human migration patterns?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LectureView;