import { computed } from "vue";
import { type URL, urlSchema } from "~/lib/schema";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import * as v from "valibot";

type Props = {
  id?: string;
  modelValue: URL;
  placeholder?: string;
  onUpdate: (value: URL) => void;
};

export default function UrlInput({ id, modelValue, placeholder, onUpdate }: Props) {

  const hasError = computed(() => !v.safeParse(urlSchema, modelValue).success);

  return (
    <div>
      <div class="flex gap-x-1">
        <Input
          v-model={modelValue.href}
          class="flex-1"
          onUpdate:modelValue={(value) => {
            onUpdate({
              ...modelValue,
              href: value as string,
            })
          }}
        />

        <Popover>
          <TooltipProvider>
            <Tooltip>
              <PopoverTrigger as-child>
                <Button size="icon" variant="ghost"></Button>
              </PopoverTrigger>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent class="p-1.5">
            <Input
              v-model={modelValue.label}
              place-holder="Label"
              onUpdate:modelValue={(value) => {
                onUpdate({
                  ...modelValue,
                  label: value as string,
                });
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {hasError.value && (
        <small class="opacity-75">{`URL must start with https://`}</small>
      )}
    </div>
  );
};
