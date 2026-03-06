import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateComment } from ".";

describe('Checking the logic of writing a comment', () => {
    test('Successfully calls onSubmitForm with form value and clears input', async () => {
        const handleSubmit = vi.fn();
        render(<CreateComment onSubmitForm={handleSubmit} />);

        const input = screen.getByPlaceholderText(/напишите комментарий/i);
        const button = screen.getByRole('button');

        const text = 'Новый комментарий';

        await userEvent.type(input, text);
        await userEvent.click(button);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({ content: text })
        );

        expect(input.value).toBe('');
    });

    test('Successfully disables submit button when input is empty' , () => {
        const handleSubmit = vi.fn();
        render(<CreateComment onSubmitForm={handleSubmit} />);

        const button = screen.getByRole('button');
        expect(button.disabled).toBe(true);
    });
});