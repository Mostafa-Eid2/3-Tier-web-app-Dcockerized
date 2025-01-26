from flask import Blueprint, render_template, request, redirect, url_for

# إنشاء الـ Blueprint
main_routes = Blueprint('main_routes', __name__)

# المسار الرئيسي
@main_routes.route('/')
def index():
    return render_template('index.html')

# مسار الوصفات الكلاسيكية
@main_routes.route('/classics')
def classics():
    return render_template('classics.html')

# مسار وصفات الحلوى
@main_routes.route('/desserts')
def desserts():
    return render_template('desserts.html')

# صفحة البحث
@main_routes.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        search_text = request.form.get('search-textbox')
        return render_template('search-page.html', text=search_text)
    return redirect(url_for('main_routes.index'))
