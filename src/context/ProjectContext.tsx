import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProjectShowcaseItem, SHOWCASE_PROJECTS } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'alfi_portfolio_trainer_programs_v3';

const isStaleTechProject = (item: any): boolean => {
  if (!item || !Array.isArray(item.technologies)) return false;
  const techString = item.technologies.join(' ').toLowerCase();
  return (
    techString.includes('three.js') ||
    techString.includes('webgl') ||
    techString.includes('react 19') ||
    techString.includes('web audio') ||
    techString.includes('typescript') ||
    techString.includes('tailwind css')
  );
};

const sanitizeProjects = (data: any): ProjectShowcaseItem[] => {
  if (!Array.isArray(data) || data.length === 0) return SHOWCASE_PROJECTS;
  if (data.some(isStaleTechProject)) return SHOWCASE_PROJECTS;
  return data;
};

interface ProjectContextType {
  projects: ProjectShowcaseItem[];
  isLoading: boolean;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  updateProject: (id: string, updatedFields: Partial<ProjectShowcaseItem>) => void;
  addProject: (newProject: ProjectShowcaseItem) => void;
  deleteProject: (id: string) => void;
  resetToDefaultProjects: () => void;
  reloadProjects: () => Promise<void>;
  optimizeBloggerUrl: (url: string) => string;
  isCustomized: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Helper to optimize Blogger / Blogspot image URL for high resolution display
export const optimizeBloggerImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return url;
  const trimmed = url.trim();
  
  // Blogger / Google User Content patterns:
  // e.g. https://blogger.googleusercontent.com/img/b/.../s320/... -> /s1600/
  // e.g. https://1.bp.blogspot.com/.../s320/... -> /s1600/
  // e.g. https://lh3.googleusercontent.com/...=s320 -> =s1600
  if (
    trimmed.includes('blogger.googleusercontent.com') ||
    trimmed.includes('.bp.blogspot.com') ||
    trimmed.includes('googleusercontent.com')
  ) {
    // Replace /s[0-9]+(-[a-z0-9]+)?/ with /s1600/
    const optimized = trimmed.replace(/\/s[0-9]+(-[a-z0-9]+)?\//, '/s1600/');
    return optimized;
  }

  return trimmed;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectShowcaseItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeProjects(parsed);
      }
    } catch (e) {
      console.warn('Gagal memuat proyek dari localStorage:', e);
    }
    return SHOWCASE_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isCustomized, setIsCustomized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial simulated fetch to show smooth perceived skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const sanitized = sanitizeProjects(parsed);
          setProjects(sanitized);
          if (sanitized !== SHOWCASE_PROJECTS) {
            setIsCustomized(true);
          }
        }
      } catch (e) {
        console.warn('Gagal memuat proyek dari localStorage:', e);
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const reloadProjects = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitized = sanitizeProjects(parsed);
        setProjects(sanitized);
        if (sanitized !== SHOWCASE_PROJECTS) {
          setIsCustomized(true);
        }
      } else {
        setProjects(SHOWCASE_PROJECTS);
      }
    } catch {
      setProjects(SHOWCASE_PROJECTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      setIsCustomized(Boolean(saved));
    } catch {
      setIsCustomized(false);
    }
  }, [projects]);

  const updateProject = (id: string, updatedFields: Partial<ProjectShowcaseItem>) => {
    setProjects((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...updatedFields,
            col1Img1: updatedFields.col1Img1 ? optimizeBloggerImageUrl(updatedFields.col1Img1) : item.col1Img1,
            col1Img2: updatedFields.col1Img2 ? optimizeBloggerImageUrl(updatedFields.col1Img2) : item.col1Img2,
            col2Img: updatedFields.col2Img ? optimizeBloggerImageUrl(updatedFields.col2Img) : item.col2Img,
          };
        }
        return item;
      });

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Gagal menyimpan proyek ke localStorage:', e);
      }

      return next;
    });
  };

  const addProject = (newProject: ProjectShowcaseItem) => {
    const preparedProject: ProjectShowcaseItem = {
      ...newProject,
      col1Img1: optimizeBloggerImageUrl(newProject.col1Img1),
      col1Img2: optimizeBloggerImageUrl(newProject.col1Img2),
      col2Img: optimizeBloggerImageUrl(newProject.col2Img),
    };

    setProjects((prev) => {
      const next = [...prev, preparedProject];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Gagal menyimpan proyek ke localStorage:', e);
      }
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Gagal menyimpan proyek ke localStorage:', e);
      }
      return next;
    });
  };

  const resetToDefaultProjects = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Gagal membersihkan localStorage:', e);
    }
    setProjects(SHOWCASE_PROJECTS);
    setIsCustomized(false);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        activeProjectId,
        setActiveProjectId,
        updateProject,
        addProject,
        deleteProject,
        resetToDefaultProjects,
        reloadProjects,
        optimizeBloggerUrl: optimizeBloggerImageUrl,
        isCustomized,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
