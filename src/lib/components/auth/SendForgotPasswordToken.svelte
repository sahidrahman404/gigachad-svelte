<script lang="ts">
	import { goto } from '$app/navigation';
	import { graphql } from '$houdini';
	import { reporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { createForm } from 'felte';
	import { z } from 'zod';
	import InputError from '../helpers/InputError.svelte';
	import type { GraphqlError } from '../helpers/graphql';
	import GraphqlMutationError from '../helpers/GraphqlMutationError.svelte';
	let isFocused: boolean = true;

	const forgotPasswordSchema = z.object({
		email: z.string().email()
	});

	const createPasswordResetTokenMutation = graphql(`
		mutation CreatePasswordResetTokenMutation($input: ResetPasswordInput!) {
			createPasswordResetToken(input: $input)
		}
	`);

	let graphqlMutationError: GraphqlError = null;

	const { form, isSubmitting, isValid } = createForm<
		z.infer<typeof forgotPasswordSchema>
	>({
		onSubmit: async (values) => {
			const res = await createPasswordResetTokenMutation.mutate({
				input: {
					email: values.email
				}
			});
			if (res.data && res.data.createPasswordResetToken) {
				goto('/auth/forgot');
				return;
			}
			graphqlMutationError = res.errors;
		},
		extend: [validator({ schema: forgotPasswordSchema }), reporter]
	});
</script>

<div
	class="mt-7 bg-surface-100 border border-gray-200 rounded-xl shadow-sm dark:bg-surface-800 dark:border-surface-700"
>
	<div class="p-4 sm:p-7">
		<div class="text-center">
			<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
				Forgot Password
			</h1>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				Please enter email address of your registration below
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
							type="text"
							name="email"
							id="email"
							class="input"
							title="Input (email)"
							required
						/>
						<InputError forInput="email" />
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
