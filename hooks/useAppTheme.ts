import { colorThemes } from '@/utils/themes';
import { useThemeStore } from '@/store/store';

export const useAppTheme = () => {
  const { selectedTheme, setSelectedTheme } = useThemeStore();
  
  const currentTheme = colorThemes[selectedTheme] || colorThemes[2]; // fallback to purple
  
  const getThemeClasses = () => ({
    background: `bg-[${currentTheme.backgroundColor}]`,
    gradient: currentTheme.gradient,
    primary: currentTheme.primaryColor,
    accent: currentTheme.accentColor,
    text: currentTheme.textColor,
    mutedText: currentTheme.mutedTextColor,
  });

  const getThemeStyles = () => ({
    background: currentTheme.gradient,
    '--theme-primary': currentTheme.primaryColor,
    '--theme-accent': currentTheme.accentColor,
    '--theme-text': currentTheme.textColor,
    '--theme-muted-text': currentTheme.mutedTextColor,
  });

  return {
    selectedTheme,
    setSelectedTheme,
    currentTheme,
    getThemeClasses,
    getThemeStyles,
  };
};