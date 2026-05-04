import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export function ProjectCard({ project, onClick, showLink }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl ${onClick ? 'cursor-pointer group transition-all' : 'transition-shadow'}`}
    >
      <div className="h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${onClick ? 'group-hover:scale-105' : 'hover:scale-105'}`}
        />
      </div>
      <div className="p-6">
        <div className="text-xs text-[var(--blue-main)] mb-2">{project.category}</div>
        <h3 className="font-bold text-[var(--blue-dark)] mb-2">{project.name}</h3>
        <p className="text-[var(--blue-dark)]/70 text-sm line-clamp-2 mb-3">{project.description}</p>
        {project.location && !showLink && (
          <div className="flex items-center gap-2 text-[var(--blue-dark)]/60 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
        )}
        {showLink && (
          <Link to="/projetos" className="inline-flex items-center gap-2 text-[var(--blue-main)] hover:gap-3 transition-all">
            Ver mais <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
