from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

# Recipe model
class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    ingredients = db.Column(db.Text, nullable=False)
    calories = db.Column(db.Float, nullable=True)
    diet_type = db.Column(db.String(50), nullable=True)
    cooking_time = db.Column(db.Integer, nullable=True)  # Time in minutes
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def __init__(self, title, ingredients, description=None, calories=None, diet_type=None, cooking_time=None, image_url=None):
        self.title = title
        self.ingredients = ingredients
        self.description = description
        self.calories = calories
        self.diet_type = diet_type
        self.cooking_time = cooking_time
        self.image_url = image_url

    def __repr__(self):
        return f"<Recipe {self.title}>"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "ingredients": self.ingredients,
            "calories": self.calories,
            "diet_type": self.diet_type,
            "cooking_time": self.cooking_time,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
