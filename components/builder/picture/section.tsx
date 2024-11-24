import { Avatar, AvatarImage, Label, Input, Popover, PopoverTrigger, PopoverContent } from "#components";
import { Aperture } from "lucide-vue-next";
import { PictureOptions } from "./options";
import * as v from "valibot";
import { PhTrash, PhUploadSimple } from "@phosphor-icons/vue";

export const PictureSection = () => {
  const inputRef = ref<HTMLInputElement | null>(null)
  //const { uploadImage } = useUploadImage();

  const resumeStore = useResumeStore();
  const avatar = resumeStore.$state.resume.data.basics.avatar;

  const isValidUrl = computed(() => v.safeParse(v.pipe(v.string(), v.url()), avatar.url).success);

  const onSelectImage = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      const response = await uploadImage(file)
      resumeStore.setValue('basics.avatar.url', response)
    }
  }

  const onAvatarClick = () => {
    if (isValidUrl.value) {
      resumeStore.setValue("basics.avatar.url", "");
    } else {
      inputRef.value?.click();
    }
  };

  return (
    <div class="flex items-center gap-x-4">
      <div class="group relative cursor-pointer" onClick={onAvatarClick}>
        <Avatar class="size-14 bg-secondary">
          <AvatarImage src={avatar.url} />
        </Avatar>

        {isValidUrl ? (
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
            <PhTrash size={16} weight="bold" />
          </div>
        ) : (
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
            <PhUploadSimple size={16} weight="bold" />
          </div>
        )}
      </div>

      <div class="flex w-full flex-col gap-y-1.5">
        <Label for="basics.avatar.url">{`Avatar`}</Label>
        <div class="flex items-center gap-x-2">
          <input ref={inputRef} hidden type="file" onChange={onSelectImage} />

          <Input
            place-holder="https://..."
            modelValue={avatar.url}
            onUpdate:modelValue={(value) => {
              resumeStore.setValue("basics.avatar.url", value);
            }}
          />

          {isValidUrl && (
            <Popover>
              <PopoverTrigger as-child>
                <Aperture />
              </PopoverTrigger>
              <PopoverContent class="w-[360px]">
                <PictureOptions />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
