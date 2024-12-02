<script setup lang="ts">
import { PhArrowRight, PhInfo } from '@phosphor-icons/vue';

const { verifyEmail, loading } = useVerifyEmail();

const handleVerifyEmail = async (token: string) => {
    await verifyEmail({ token });
    await queryClient.invalidateQueries({ queryKey: ["user"] });
};

// if (!token) return;

// void handleVerifyEmail(token);

</script>

<template>
    <div class="space-y-6">
        <div class="space-y-2">
            <h2 class="text-2xl font-semibold tracking-tight">Verify your email address</h2>
            <p class="leading-relaxed opacity-75">
                You should have received an email from <strong>Reactive Resume</strong> with a link to
                verify your account.
            </p>
        </div>

        <Alert>
            <PhInfo size="18" />
            <AlertTitle>Please note that this step is completely optional.</AlertTitle>
            <AlertDescription>
                We verify your email address only to ensure that we can send you a password reset link in case you
                forget your password.
            </AlertDescription>
        </Alert>

        <Button asChild disabled="loading">
            <Link to="/dashboard">
            Go to Dashboard
            <PhArrowRight class="ml-2" />
            </Link>
        </Button>
    </div>
</template>