<script setup lang="ts">

</script>

<template>
    <div class="flex w-full flex-col">
      <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            href="#"
            class="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <PhUsers class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <a
            href="#"
            class="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </a>
          <a
            href="#"
            class="text-muted-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </a>
        </nav>
        <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  </template>