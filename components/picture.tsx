import type { Basics } from "~/lib/schema";
import { cn, isUrl } from "~/lib/utils";

import { useResumeStore } from "~/stores/resume";

type PictureProps = {
  className?: string;
  basics: Basics;
};

export const Picture = ({ className, basics }: PictureProps) => {
  const avatar = basics.avatar;
  const fontSize = useResumeStore().$state.resume.data.metadata.typography.font.size;

  if (!isUrl(avatar.url) || avatar.effects.hidden) return null;

  return (
    <img
      src={avatar.url}
      alt="Profile"
      class={cn(
        "relative z-20 object-cover",
        avatar.effects.border && "border-primary",
        avatar.effects.grayscale && "grayscale",
        className,
      )}
      style={{
        maxWidth: `${avatar.size}px`,
        aspectRatio: `${avatar.aspect_ratio}`,
        borderRadius: `${avatar.border_radius}px`,
        borderWidth: `${avatar.effects.border ? fontSize / 3 : 0}px`,
      }}
    />
  );
};
