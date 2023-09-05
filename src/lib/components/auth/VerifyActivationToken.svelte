<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	let isFocused: boolean = true;
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter } from '@felte/reporter-svelte';
	import { graphql } from '$houdini';
	import InputError from '../helpers/InputError.svelte';
	import wretch from 'wretch';
	import GraphqlMutationError from '../helpers/GraphqlMutationError.svelte';
	import type { GraphqlError } from '../helpers/graphql';
	import { page } from '$app/stores';

	let emailParams = $page.url.searchParams.get('email');
	$: email = emailParams ? emailParams : '(your email)';

	const tokenSchema = z.object({
		token: z.string().min(26).max(26)
	});

	const activateUserMutation = graphql(`
		mutation ActivateUserMutation($input: ActivateUserInput!) {
			activateUser(input: $input) {
				tokenPlainText
				user {
					id
					username
				}
			}
		}
	`);

	let graphqlMutationError: GraphqlError = null;

	const { form, isSubmitting, isValid } = createForm<
		z.infer<typeof tokenSchema>
	>({
		onSubmit: async (values) => {
			const res = await activateUserMutation.mutate({
				input: {
					tokenPlainText: values.token
				}
			});
			if (res.data && res.data.activateUser) {
				const token = res.data.activateUser.tokenPlainText;
				wretch(`/api/tokens/set/${token}`)
					.options({ credentials: 'include', mode: 'cors' })
					.get()
					.json(() => {
						window.location.assign('/dashboard/routines');
					});
				return;
			}
			graphqlMutationError = res.errors;
		},
		extend: [validator({ schema: tokenSchema }), reporter]
	});
</script>

<div
	class="mt-7 bg-surface-100 border border-gray-200 rounded-xl shadow-sm dark:bg-surface-800 dark:border-surface-700"
>
	<div class="p-4 sm:p-7">
		<div class="text-center">
			<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
				We sent you token
			</h1>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				Enter it below to verify {email}
			</p>
		</div>

		<div class="mt-5">
			<!-- Form -->
			<form use:focusTrap={isFocused} use:form>
				<div class="grid gap-y-4">
					<!-- Form Group -->
					<div>
						<div class="flex justify-between items-center">
							<label for="token" class="label text-sm mb-2"
								><span>Token</span></label
							>
							<a
								class="text-sm text-tertiary-600 decoration-2 hover:underline font-medium"
								href="/auth/verify?mode=resend">Didn't receive token?</a
							>
						</div>
						<input
							type="text"
							name="token"
							id="token"
							class="input"
							title="Input (token)"
							required
						/>
						<InputError forInput="token" />
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
