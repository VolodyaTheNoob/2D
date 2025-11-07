export class Rectangle{
constructor(_Left = 0,_Top = 0,_Width = 0,_Height = 0){
    this.Left = _Left;
    this.Top = _Top;
    this.Width = _Width;
    this.Height = _Height;
    this.Right = this.Left + this.Width;
    this.Bottom = this.Top + this.Height;
}
Set(_Left = 0,_Top = 0,_Width = 0,_Height = 0){
    this.Left = _Left;
    this.Top = _Top;
    this.Width = _Width;
    this.Height = _Height;
    this.Right = this.Left + this.Width;
    this.Bottom = this.Top + this.Height;
}
Within(OtherRect){
    return (OtherRect.Left <= this.Left &&
        OtherRect.Right >= this.Right &&
        OtherRect.Top <= this.Top &&
        OtherRect.Bottom >= this.Bottom);
    }
Overlaps = function(OtherRect) {
	    return (this.Left < OtherRect.Right &&
	      OtherRect.Left < this.Right &&
	      this.Top < OtherRect.Bottom &&
	      OtherRect.Top < this.Bottom);
	  }
}
