using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Helpers
{
    public static class ImageHelper
    {
        public static void OptimizeNResize(HttpPostedFileBase file, string filePath, int Width, int Height)
        {
            Bitmap original_image = new Bitmap(file.InputStream);
            OptimizeNResize(original_image, filePath, Width, Height);
        }
        public static void OptimizeNResize(Bitmap bitmap, string filePath, int Width, int Height)
        {
            Bitmap original_image = bitmap;

            Bitmap final_image = null;
            Graphics graphic = null;
            int reqW = Width;
            int reqH = Height;
            final_image = new Bitmap(reqW, reqH);
            graphic = Graphics.FromImage(final_image);
            graphic.FillRectangle(new SolidBrush(Color.Transparent),
                new Rectangle(0, 0, reqW, reqH));
            graphic.InterpolationMode = InterpolationMode.HighQualityBicubic; 
            graphic.DrawImage(original_image, 0, 0, reqW, reqH);

            if (original_image != null) original_image.Dispose();
            try
            {
                final_image.Save(filePath);
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (graphic != null) graphic.Dispose();
                if (final_image != null) final_image.Dispose();
            }

        }

        public static void CropImage(CropImageObj data, string filepath_prefix, string filename = "", int w = 0, int h = 0)
        {
            if (!Directory.Exists(filepath_prefix))
            {
                Directory.CreateDirectory(filepath_prefix);
            }
            var finalFN = string.IsNullOrEmpty(filename) ? data.file.FileName : filename;

            var filepath = Path.Combine(filepath_prefix, finalFN);


            using (Bitmap original_image = new Bitmap(data.file.InputStream))
            {
                if (w == 0 || h == 0)
                {
                    w = (int)data.w;
                    h = (int)data.h;
                }
                Rectangle cropRect = new Rectangle((int)data.x1, (int)data.y1, (int)data.w, (int)data.h);
                using (Bitmap result_image = new Bitmap(w, h))
                {
                    using (Graphics graphic = Graphics.FromImage(result_image))
                    {
                        Rectangle destRect = new Rectangle(0, 0, result_image.Width, result_image.Height);

                        graphic.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        graphic.DrawImage(original_image, destRect, cropRect, GraphicsUnit.Pixel);

                        result_image.Save(filepath);
                    }
                }
            }
        }

        public static Bitmap BytesToBitmap(byte[] Bytes)
        {
            MemoryStream stream = null;
            try
            {
                stream = new MemoryStream(Bytes);
                return new Bitmap((Image)new Bitmap(stream));
            }
            catch (ArgumentNullException ex)
            {
                throw ex;
            }
            catch (ArgumentException ex)
            {
                throw ex;
            }
            finally
            {
                stream.Close();
            }
        }

        #region 刪舊圖
        public static void Remove(String url)
        {
            if (System.IO.File.Exists(url))
            {
                System.IO.File.Delete(url);
            }
        }
        #endregion

    }


    public class CropImageObj
    {
        public CropImageObj() { }
        public CropImageObj(string u = "")
        {
            url = u;
        }

        public Double x1 { get; set; }
        public Double x2 { get; set; }
        public Double y1 { get; set; }
        public Double y2 { get; set; }
        public Double w { get; set; }
        public Double h { get; set; }
        public HttpPostedFileBase file { get; set; }
        public string url { get; set; }
    }
}