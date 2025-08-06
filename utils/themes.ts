// Shared theme configuration for the application
export interface ThemeConfig {
  color: string;
  gradient?: string;
  name: string;
  // Additional theme properties for unified styling
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedTextColor: string;
}

export const colorThemes: ThemeConfig[] = [
  { 
    color: "#061016", 
    // gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.2) 0%, rgba(29, 161, 242, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Default",
    primaryColor: "#1DA1F2",
    accentColor: "rgba(255,76,2,0.8)",
    backgroundColor: "#061016",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
  { 
    color: "#1DA1F2", 
    gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.2) 0%, rgba(29, 161, 242, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Twitter Blue",
    primaryColor: "#1DA1F2",
    accentColor: "#1DA1F2",
    backgroundColor: "rgba(5, 18, 26, 0.8)",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
  { 
    color: "#FF9500", 
    gradient: "linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 149, 0, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Orange",
    primaryColor: "#FF9500",
    accentColor: "#FF9500",
    backgroundColor: "rgba(5, 18, 26, 0.8)",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
  { 
    color: "#7C3AED", 
    gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Purple",
    primaryColor: "#7C3AED",
    accentColor: "#7C3AED",
    backgroundColor: "rgba(5, 18, 26, 0.8)",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
  { 
    color: "#4F46E5", 
    gradient: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Indigo",
    primaryColor: "#4F46E5",
    accentColor: "#4F46E5",
    backgroundColor: "rgba(5, 18, 26, 0.8)",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
  { 
    color: "#e05c14", 
    gradient: "linear-gradient(135deg, rgba(224, 92, 20, 0.2) 0%, rgba(224, 92, 20, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Brand Orange",
    primaryColor: "#e05c14",
    accentColor: "#e05c14",
    backgroundColor: "rgba(5, 18, 26, 0.8)",
    textColor: "#FFFFFF",
    mutedTextColor: "#FFFFFF70"
  },
];

export const DEFAULT_THEME_INDEX = 0; // Purple theme as default