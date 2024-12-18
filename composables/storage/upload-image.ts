import { useMutation } from "@tanstack/vue-query";


export const uploadImage = (file: File) => {
  const formData = new FormData();
  const { $api } = useNuxtApp();
  formData.append("file", file);
  return $api("/storage/image", {
    method: 'put',
    body: formData,
  })
};

export const useUploadImage = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: uploadImageFn,
  } = useMutation({
    mutationFn: uploadImage,
  });

  return { uploadImage: uploadImageFn, loading, error };
};
