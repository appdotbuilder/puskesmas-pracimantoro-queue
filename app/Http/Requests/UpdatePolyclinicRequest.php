<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePolyclinicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('polyclinics', 'name')
                    ->ignore($this->route('polyclinic')->id)
                    ->where('room_number', $this->room_number),
            ],
            'room_number' => 'required|string|max:50',
            'description' => 'nullable|string',
            'opening_time' => 'required|date_format:H:i',
            'closing_time' => 'required|date_format:H:i|after:opening_time',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama poliklinik wajib diisi.',
            'name.unique' => 'Kombinasi nama dan nomor ruangan sudah ada.',
            'room_number.required' => 'Nomor ruangan wajib diisi.',
            'opening_time.required' => 'Waktu buka wajib diisi.',
            'closing_time.required' => 'Waktu tutup wajib diisi.',
            'closing_time.after' => 'Waktu tutup harus setelah waktu buka.',
        ];
    }
}