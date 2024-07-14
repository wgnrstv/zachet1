# from django.views.generic import View
from django.shortcuts import render
from django.views.generic import FormView
from .forms import ContactForm
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.utils.translation import gettext as _


def my_view(request):
    if request.method == 'POST':
        # Получаем данные из формы
        data = request.POST.dict()

        # Получаем IP-адрес
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')

        # Получаем информацию о системе и браузере
        user_agent = request.META.get('HTTP_USER_AGENT')

        # Формируем JSON-ответ
        response_data = {
            'form_data': data,
            'ip_address': ip,
            'user_agent': user_agent
        }

        return JsonResponse(response_data)

    # Если запрос не POST, возвращаем шаблон
    return render(request, 'my_template.html')


class ContactView(FormView):
    template_name = 'index.html'
    form_class = ContactForm
    success_url = reverse_lazy('index')

    def form_valid(self, form):
        # Здесь можно обработать отправленную форму, например, отправить email
        print(form.cleaned_data)
        return super().form_valid(form)



