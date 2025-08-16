<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQueueRequest extends FormRequest
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
            'polyclinic_id' => [
                'required',
                'exists:polyclinics,id',
                Rule::unique('queues')->where(function ($query) {
                    return $query->where('user_id', auth()->id())
                                 ->where('queue_date', today())
                                 ->whereNotIn('status', ['cancelled', 'served']);
                }),
            ],
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
            'polyclinic_id.required' => 'Poliklinik wajib dipilih.',
            'polyclinic_id.exists' => 'Poliklinik tidak valid.',
            'polyclinic_id.unique' => 'Anda sudah mengambil nomor antrian di poliklinik ini hari ini.',
        ];
    }
}