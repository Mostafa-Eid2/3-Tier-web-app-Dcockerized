from flask import Flask
from routes import main_routes
from models import db

# إنشاء تطبيق Flask
app = Flask(__name__)

# إعدادات قاعدة البيانات
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'  # قاعدة بيانات SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # تعطيل التحذيرات غير الضرورية

# تهيئة قاعدة البيانات
db.init_app(app)

# تسجيل المسارات (routes)
app.register_blueprint(main_routes)

# الصفحة الرئيسية
@app.route('/')
def home():
    return "Welcome to Recipe Paradise!"

# تشغيل التطبيق
if __name__ == '__main__':
    # تهيئة قاعدة البيانات (إذا لم تكن موجودة)
    with app.app_context():
        db.create_all()

    # تشغيل التطبيق مع تمكين التصحيح
    app.run(debug=True)
