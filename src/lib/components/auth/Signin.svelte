<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { graphql } from '$houdini';
	import { z } from 'zod';
	import GraphqlMutationError from '../helpers/GraphqlMutationError.svelte';
	import InputError from '../helpers/InputError.svelte';
	import { createForm } from 'felte';
	import type { GraphqlError } from '../helpers/graphql';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import wretch from 'wretch';
	import { PUBLIC_BASE_DOMAIN } from '$env/static/public';

	let isFocused: boolean = true;

	let currentPath = $page.url.pathname;

	const signinSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8).max(72)
	});

	const createAuthenticationTokenMutation = graphql(`
		mutation CreateAuthenticationTokenMutation($input: LoginInput!) {
			createAuthenticationToken(input: $input) {
				tokenPlainText
				user {
					id
					username
					email
					activated
				}
			}
		}
	`);

	let graphqlMutationError: GraphqlError = null;
	const { form, isSubmitting, isValid } = createForm<
		z.infer<typeof signinSchema>
	>({
		onSubmit: async (values) => {
			const res = await createAuthenticationTokenMutation.mutate({
				input: {
					email: values.email,
					password: values.password
				}
			});
			if (res.data && res.data.createAuthenticationToken) {
				if (res.data.createAuthenticationToken.user.activated === 0) {
					goto(
						`/auth/verify?email=${res.data.createAuthenticationToken.user.email}`
					);
					return;
				}
				const token = res.data.createAuthenticationToken.tokenPlainText;
				wretch(`${PUBLIC_BASE_DOMAIN}/v1/tokens/set/${token}`)
					.options({ credentials: 'include', mode: 'cors' })
					.get()
					.json((res) => {
						window.location.assign('/dashboard');
					});
				return;
			}
			graphqlMutationError = res.errors;
		},
		extend: [validator({ schema: signinSchema }), reporter]
	});
</script>

<div
	class="mt-7 bg-surface-100 border border-gray-200 rounded-xl shadow-sm dark:bg-surface-800 dark:border-surface-700"
>
	<div class="p-4 sm:p-7">
		<div class="text-center">
			<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
				Sign in
			</h1>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
				Don't have an account yet?
				<button
					on:click={() => {
						goto(`${currentPath}?mode=signup`);
					}}
					class="text-primary-600 decoration-2 hover:underline font-medium"
				>
					Sign up here
				</button>
			</p>
		</div>

		<div class="mt-5">
			<!-- Form -->
			<form use:focusTrap={isFocused} use:form>
				<div class="grid gap-y-4">
					<!-- Form Group -->
					<div>
						<label for="email" class="label text-sm mb-2"
							><span>Email</span></label
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
					<div>
						<div class="flex justify-between items-center">
							<label for="password" class="label text-sm mb-2"
								><span>Password</span></label
							>
							<a
								class="text-sm text-tertiary-600 decoration-2 hover:underline font-medium"
								href="/auth/forgot?mode=send">Forgot Password?</a
							>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							class="input"
							title="Input (password)"
							required
						/>
						<InputError forInput="password" />
					</div>
					<!-- End Form Group -->
					<GraphqlMutationError {graphqlMutationError} />
					<button
						type="submit"
						class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary-500 text-white dark:text-gray-800 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
						disabled={$isSubmitting || !$isValid}>Submit</button
					>
				</div>
			</form>
			<!-- End Form -->
		</div>
	</div>
</div>
