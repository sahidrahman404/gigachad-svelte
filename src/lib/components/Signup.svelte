<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import * as z from 'zod';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { reporter } from '@felte/reporter-svelte';
	import InputError from './helpers/InputError.svelte';
	import { graphql } from '$houdini';
	import GraphqlMutationError from './helpers/GraphqlMutationError.svelte';
	import type { GraphqlError } from './helpers/graphql';
	let currentPath = $page.url.pathname;
	let isFocused: boolean = true;

	const signupSchema = z
		.object({
			email: z.string().email(),
			name: z.string().min(3),
			username: z.string().min(5).max(72),
			password: z.string().min(8).max(72),
			confirmPassword: z.string().min(8).max(72)
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword']
		});

	const createUserMutation = graphql(`
		mutation CreateUserMutation($input: CreateUserInput!) {
			createUser(input: $input) {
				id
				email
			}
		}
	`);
	let graphqlMutationError: GraphqlError = null;
	const { form, isSubmitting, isValid } = createForm<
		z.infer<typeof signupSchema>
	>({
		onSubmit: async (values) => {
			const res = await createUserMutation.mutate({
				input: {
					email: values.email,
					name: values.name,
					username: values.username,
					hashedPassword: values.password
				}
			});
			if (res.data && res.data.createUser.id) {
				goto('/auth/verify');
			}
			graphqlMutationError = res.errors
		},
		extend: [validator({ schema: signupSchema }), reporter]
	});
</script>

<div
	class="mt-7 bg-surface-100 border border-gray-200 rounded-xl shadow-sm dark:bg-surface-800 dark:border-surface-700"
>
	<div class="p-4 sm:p-7">
		<div class="text-center">
			<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
				Sign up
			</h1>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				Already have an account?
				<button
					on:click={() => {
						goto(`${currentPath}?mode=signin`);
					}}
					class="text-primary-600 decoration-2 hover:underline font-medium"
				>
					Sign in here
				</button>
			</p>
		</div>

		<div class="mt-5">
			<div
				class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"
			/>

			<!-- Form -->
			<form use:form use:focusTrap={isFocused}>
				<div class="grid gap-y-4">
					<!-- Form Group -->
					<div>
						<label for="email" class="label text-sm mb-2"
							><span>Email address</span></label
						>
						<input
							type="email"
							name="email"
							id="email"
							class="input"
							title="Input (email)"
							required
						/>
						<InputError forInput="email" />
					</div>
					<!-- End Form Group -->

					<!-- Form Group -->
					<div>
						<label for="name" class="label text-sm mb-2"
							><span>Name</span></label
						>
						<input
							type="text"
							name="name"
							id="name"
							title="Input (name)"
							class="input"
							required
						/>
						<InputError forInput="name" />
					</div>
					<!-- End Form Group -->

					<!-- Form Group -->
					<div>
						<label for="username" class="label text-sm mb-2"
							><span>Username</span></label
						>
						<input
							type="text"
							name="username"
							id="username"
							title="Input (username)"
							class="input"
							required
						/>
						<InputError forInput="username" />
					</div>
					<!-- End Form Group -->

					<!-- Form Group -->
					<div>
						<label for="password" class="label text-sm mb-2"
							><span>Password</span></label
						>
						<input
							type="password"
							name="password"
							id="password"
							title="Input (password)"
							class="input"
							required
						/>
						<InputError forInput="passwrod" />
					</div>
					<!-- End Form Group -->

					<!-- Form Group -->
					<div>
						<label for="confirm-password" class="label text-sm mb-2"
							><span>Confirm Password</span></label
						>
						<input
							type="password"
							name="confirmPassword"
							id="confirm-password"
							title="Input (confirm-password)"
							class="input"
							required
						/>
						<InputError forInput="confirmPassword" />
					</div>
					<!-- End Form Group -->
					<GraphqlMutationError graphqlMutationError={graphqlMutationError}/>
					<button
						type="submit"
						class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary-500 text-white dark:text-gray-800 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
						disabled={$isSubmitting || !$isValid}>Sign up</button
					>
				</div>
			</form>
			<!-- End Form -->
		</div>
	</div>
</div>
